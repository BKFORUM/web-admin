import { IEvent } from "@interfaces/IEvent";
import BaseURL from "@utils/api/baseURL";

const getAllEvent = (params: any) => {
    return BaseURL({
        url: `/events`,
        method: "GET",
        params,
    });
}

const addEvent = (data: Omit<IEvent, 'id'>) => {
    return BaseURL({
        url: `/events`,
        method: "POST",
        data,
    });
};

const editEvent = (data: IEvent) => {
    const { id, ...dataWithoutId } = data;
    return BaseURL({
        url: `/events/${id}`,
        method: "PUT",
        data: dataWithoutId
    });
};

const deleteEvent = (id: string) => {
    return BaseURL({
        url: `/events/${id}`,
        method: "DELETE",
    });
};

export { getAllEvent, addEvent, editEvent, deleteEvent }