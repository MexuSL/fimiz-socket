import { Kafka,Producer } from "kafkajs";

import dotenv from "dotenv"

dotenv.config()

let BROKER_1 = process.env.BROKER_1||''
let BROKER_2 = process.env.BROKER_2||''
let BROKER_3 = process.env.BROKER_3||''


let kafka:Kafka = new Kafka({
    brokers:[BROKER_1],
    clientId:process.env.SERVER_ID
})

let producer:Producer = kafka.producer({
    
})

type TransferCommodityParams = {
    senderAddress: string;
    recipientAddress: string;
    amount: number;
    date:Date
};

export async function runNotificationProducer(value:TransferCommodityParams){
    try{
        await producer.connect()
        producer.send({
            topic:"ADD_NOTIFICATION",
            messages:[{value:JSON.stringify({...value,serverId:process.env.SERVER_ID})}]
        })
        await producer.disconnect()

    }catch(err){
        console.log(err)
    }

}

type VerificationParams = {
    verifcationData:{
        verified:boolean,
        verificationRank:string
    },
    userId:string
}

export async function runUpdateUserVerification(value:VerificationParams){
    try{
        await producer.connect()
        producer.send({
            topic:"ADD_NOTIFICATION",
            messages:[{value:JSON.stringify({...value,serverId:process.env.SERVER_ID})}]
        })
        await producer.disconnect()

    }catch(err){
        console.log(err)
    }

}

