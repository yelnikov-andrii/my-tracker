import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from "../store/timeSlice";

export function changeTime(deals: any, dealId: number, dispatch: any) {
    const foundDeal = deals.find((deal: any) => deal.id === dealId);
    const startMinutes = foundDeal.start.slice(foundDeal.start.indexOf(':') + 1);
    const startHour = foundDeal.start.slice(0, foundDeal.start.lastIndexOf(':'));
    const finishMinutes = foundDeal.finish.slice(foundDeal.finish.indexOf(':') + 1);
    const finishHour = foundDeal.finish.slice(0, foundDeal.finish.lastIndexOf(':'));
    dispatch(setStartHour(startHour));
    dispatch(setStartMinutes(startMinutes));
    dispatch(setFinishHour(finishHour));
    dispatch(setFinishMinutes(finishMinutes));
}