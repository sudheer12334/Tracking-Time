export const loginSuccessToast = (toast,responseMessage) => {
    toast({
        title: 'Login Successful.',
        description: responseMessage,
        status: 'success',
        duration: 2000,
        isClosable: true,
    });
}
export const loginFailedToast = (toast,responseMessage) => {
    toast({
        title: 'Login failed.',
        description: responseMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
    });
}

export const serverErrorToast = (toast,responseMessage) => {
    toast({
        title: 'Uh! Something went wrong!',
        description: responseMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
    });
}