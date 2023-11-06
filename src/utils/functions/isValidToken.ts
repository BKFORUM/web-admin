
const IsTokenValid = (): boolean => {
    console.log(1111)
    const now = Date.now() / 1000;
    const user: any = localStorage.getItem('user');
    if (!user) return true;
    let expiry: number = 0
    if (user?.created_at !== undefined && user?.expires_in !== undefined) {
        expiry = Number(user.created_at) + user.expires_in;
    }
    return now < expiry;
}

export default IsTokenValid;