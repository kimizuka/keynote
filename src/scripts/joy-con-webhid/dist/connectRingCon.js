export const connectRingCon=async device=>{const defineSendReportAsyncFunction=({subcommand,expectedReport,timeoutErrorMessage="timeout."})=>device=>new Promise((async(resolve,reject)=>{const timeoutId=setTimeout((()=>{device.removeEventListener("inputreport",checkInputReport);reject(new Error(timeoutErrorMessage))}),5e3);const checkInputReport=event=>{if(event.reportId!==33){return}const data=new Uint8Array(event.data.buffer);for(const[key,value]of Object.entries(expectedReport)){if(data[key-1]!==value){return}}device.removeEventListener("inputreport",checkInputReport);clearTimeout(timeoutId);setTimeout(resolve,50)};device.addEventListener("inputreport",checkInputReport);await device.sendReport(1,new Uint8Array([0,0,0,0,0,0,0,0,0,...subcommand]))}));const setInputReportModeTo0x30=defineSendReportAsyncFunction({subcommand:[3,48],expectedReport:{14:3}});const enablingMCUData221=defineSendReportAsyncFunction({subcommand:[34,1],expectedReport:{13:128,14:34}});const enablingMCUData212111=defineSendReportAsyncFunction({subcommand:[33,33,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,243],expectedReport:{14:33}});const getExtData59=defineSendReportAsyncFunction({subcommand:[89],expectedReport:{14:89,16:32},timeoutErrorMessage:"ring-con not found."});const getExtDevInFormatConfig5C=defineSendReportAsyncFunction({subcommand:[92,6,3,37,6,0,0,0,0,28,22,237,52,54,0,0,0,10,100,11,230,169,34,0,0,4,0,0,0,0,0,0,0,144,168,225,52,54],expectedReport:{14:92}});const startExternalPolling5A=defineSendReportAsyncFunction({subcommand:[90,4,1,1,2],expectedReport:{14:90}});await enablingMCUData221(device);await enablingMCUData212111(device);await getExtData59(device);await getExtDevInFormatConfig5C(device);await startExternalPolling5A(device)};