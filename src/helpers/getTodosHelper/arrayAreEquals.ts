export const arraysAreEquals = (arr1: any[], arr2: any[]):boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((item, index) => {
        return JSON.stringify(item) === JSON.stringify(arr2[index]);
    });
}