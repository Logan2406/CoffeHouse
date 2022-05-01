export const getUser = () =>
{
    return(
        {
            type:"GET_USER"
        }
    )
}

export const setUser = (user) =>
{
    console.log(user);
    return(
        {
            type:"SET_USER",
            payload:user
        }
    )
}

export const deleteUser = () =>
{
    return(
        {
            type:"DEL_USER"
        }
    )
}

