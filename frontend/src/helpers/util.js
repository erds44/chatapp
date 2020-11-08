export const messageCensor = (content) => {
    return !content.toLowerCase().includes("hate");
}