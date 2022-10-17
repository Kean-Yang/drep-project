/*type Transaction struct {
	Data *TransactionData
	Sig  []byte
}
*/

/*
type TransactionData struct {
	Version   int32
	Nonce     int64 //交易序列号
	Type      TxType
	To        crypto.CommonAddress
	ChainId   app.ChainIdType
	Amount    *big.Int
	GasPrice  *big.Int
	GasLimit  *big.Int
	Timestamp int64
	Data      []byte
	From      crypto.CommonAddress
}
*/

var BigNumber = require('bignumber.js');

function Trasnaction(){
    return {
        Data:undefined,
        Sig:undefined
    }
}

function TransactionData(){
    return {
        Version :   new BigNumber(0),
        Nonce    :  new BigNumber(0),
        Type     :  0,
        To       :  "",
        ChainId   : new BigNumber(0),
        Amount    : new BigNumber(0),
        GasPrice  : new BigNumber(0),
        GasLimit  : new BigNumber(0),
        Timestamp : new BigNumber(0),
        Data      : "",
        From      : ""
    }
}

var transaction = new TransactionData()
transaction.To = "0xc4ac59f52b3052e5c14566ed397453ea913c6fbc"
transaction.From = "0xc4ac59f52b3052e5c14566ed397453ea913c6fbc"




function Serializater() {
    var buf = Buffer.allocUnsafe(0)
    var offset = 0
    return {
        writeInt8 : function(int8Value){
            buf.writeInt8(int8Value, offset)
            offset = offset +1
        },
        writeInt16  : function(int16Value){
            buf.writeInt16BE(int16Value, offset)
            offset = offset +2
        },
        writeInt32  : function(int32Value){
            buf.writeInt32BE(int32Value, offset)
            offset = offset +4
        },
        writeInt64  : function(int64Value){  //bignumber
                //TODO
        },

        writeUint8  : function(uint8Value){
            buf.writeUInt8(uint8Value, offset)
            offset = offset + 1
        },
        writeUint16 : function(uint16Value){
            buf.writeUInt16BE(uint16Value, offset)
            offset = offset + 2
        },
        writeUint32 : function(uint32Value){
            buf.writeUInt32BE(uint16Value, offset)
            offset = offset + 4
        },
        writeUint64 : function(uint64Value){  //bignumber
//TODO
        },

        writeBytes  : function(bytes){

        },
        writeString : function(str){

        },
        toHex    : function(){
            return buffer.to("hex")
        },
    }

}

