const messageToastOptions: any = {
    position: 'top-right',
    duration: 3000,
    style: {
        border: "2px solid gray",
        background: 'gray',
        color: '#fff',
    }
}
const successToastOptions: any = {
    position: 'top-right',
    duration: 3000
}
const successToastOptionsBR: any = {
    position: 'top-right',
    duration: 3000,
    style: {
        border: "0.25rem solid green",
        padding: "0.5rem 1rem",
        background: 'white',
        fontWeight: "700"
    }
}
const errorToastOptions: any = {
    position: 'top-right',
    duration: 4000,
    style: {
        maxWidth: "40vw",
        lineHeight: "0.9",
        border: "2px solid red",
        margin: "1rem"
    }
}

export { messageToastOptions, successToastOptions,successToastOptionsBR, errorToastOptions }