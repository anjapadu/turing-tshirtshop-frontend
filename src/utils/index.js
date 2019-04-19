export const isCorrect = (data) => {
    let errors = data.errors;
    if (Array.isArray(errors) && errors.length > 0) {
        return false;
    }
    return true;
}