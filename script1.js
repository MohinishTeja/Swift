// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

alert("TIme Started! Act swiftly!!")
let timerTime = 0;
let isRunning = false;
let interval;

function startTimer () {
  if(isRunning) return;
  
  isRunning = true;
  interval = setInterval(incrementTimer, 1000);
}


function stopTimer () {
	if(!isRunning) return;
	
	isRunning = false;
	clearInterval(interval);
  }

  
function incrementTimer () {
  timerTime++;
  console.log(timerTime);
  const numOfminutes = Math.floor(timerTime / 60);
  const numOfSeconds = timerTime % 60;
  
  console.log(numOfminutes+":"+numOfSeconds);

 
}
startTimer();


(function(){

	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
				alert("Your time is "+timerTime+" seconds");
				pay();

			}, 1000);
			stopTimer();
			
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="card.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
			id: 1,
		},
		{
			name: "css3",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
			id: 2
		},
		{
			name: "html5",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
			id: 3
		},
		{
			name: "jquery",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
			id: 4
		}, 
		{
			name: "javascript",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
			id: 5
		},
		{
			name: "node",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
			id: 7
		},
		{
			name: "python",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
			id: 8
		},
		{
			name: "rails",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
			id: 9
		},
		{
			name: "sass",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
			id: 10
		},
		{
			name: "sublime",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
			id: 11
		},
		{
			name: "wordpress",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();


/*
import Portis from './@portis/web3';
import Web3 from '/web3';
*/

console.log("connected");
var web3
/*
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initPayButton()
            }
        catch (err) {
            $('#status').html('User denied account access', err)
            }
        } 
    else if (window.web3) {
            web3 = new Web3(web3.currentProvider)
            initPayButton()
    }
    else {
        $('#status').html('No Metamask (or other Web3 Provider) installed')
    }
})*/

const address  = '0xb4fae488e7C0c00735Fc062b792B7Da45c023e12';  //rinkeby_old
const address1 = '0x921F95fe57D033408559DEC71772DDe2E95D6488';  //rinkeby
const address2 = '0xD1A9A8ecb4CF084a761fcf2b6670B6229CD5df41';  //matic
const address3 = '0x785ca3057f4319c80a0444f1025e89aFdAE8A150';  //BSC
const address4 = '0x096fF0b21a3523b574C92CC47875a888ff21757a';
const address5 = '0xc8d3130d85107ba57DFBc87B65F5a77087A597EA';
const address6 = '0x999Bac5989ee84997cC8C89fba447aB65d471911'; //patreon matic



const address7 ='0x7143AccFAa1FCeD91F4aEc719BDf58948E5037C3'; //Polygon Game

const abi =[
	
	
		{
			"constant": true,
			"inputs": [],
			"name": "balanceof",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "invest",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address payable",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "time",
					"type": "uint256"
				}
			],
			"name": "payout",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		}
	
]

//contract = new web3.eth.contract(abi,address)
async function pay() {

		var web3=new Web3(window.ethereum)

		await window.ethereum.enable()
		

/*
const portis = new Portis('8327b253-e459-44fa-94bd-c9cc457bf5fb', 'rinkeby');
const web3 = new Web3(portis.provider);
*/
		contract = new web3.eth.Contract(abi,address7)

        /*
        var paymentAddress = document.getElementById("address").value;
        var weight = document.getElementById("weight").value;
        var category = document.getElementById("category").value;
*/
        const accounts = await web3.eth.getAccounts()

        console.log(accounts[0]);
        contract.methods.payout(accounts[0],timerTime).send({
            from:accounts[0]
            

        }) 


                
} 


