"use strict";
async function getDataFromAPI() {
    // requesting the data and then an error is happening 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("an error happened");
            // resolve("data is here"); //return
        }, 2000);
    });
}
// getFataFromAPI(); //[UnhandledPromiseRejection willhappen if we call a promise that is rejected
async function getDataAndHandelError() {
    try {
        const a = await getDataFromAPI();
        console.log(a); //if Error happened
    }
    catch (error) {
        console.log(error.message);
    }
}
// getDataAndHandelError();
// getDataFromAPI().then((data) => {
//     //if no error happned
//     console.log('Output from then',data);
// }).catch((error) => {
//     console.log('.catch:',error.message);
// })
try {
    getData();
}
catch (error) {
    console.error(error.message);
}
