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



const address7 ='0xD4Fc541236927E2EAf8F27606bD7309C1Fc2cbee'; //Polygon Game

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

        
        contract.methods.invest(1).send({
            from:accounts[0],
            value: 10000000000000000

        }) 


                
} 


