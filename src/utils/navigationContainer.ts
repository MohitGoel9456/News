//used to navigate to new screen
export const navigate = (navigation: any, path: string, params = {}): void => {
    navigation.navigate(path, params);
}

//if you want to replace(remove) the existing component from stack
export const replace = (navigation: any, path: string, params = {}): void => {
    navigation.replace(path, params);
}