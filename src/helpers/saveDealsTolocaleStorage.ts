export const saveDealsToLocaleStorage = (deals: any) => {
  localStorage.setItem('deals', JSON.stringify(deals));
}