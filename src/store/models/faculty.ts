import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { getAllFaculty } from "../../services/faculty.service";

export interface IFacultyModel {
    //MessageError
    messageError: string;
    setMessageError: Action<IFacultyModel, string>;

    //GetAllFaculty
    isGetAllFacultySuccess: boolean;
    setIsGetAllFacultySuccess: Action<IFacultyModel, boolean>;
    getAllFaculty: Thunk<IFacultyModel, undefined>;
}

export const facultyModel: IFacultyModel = persist({
    //MessageError
    messageError: "",
    setMessageError: action((state, payload) => {
        state.messageError = payload;
    }),

    //GetAllFaculty
    isGetAllFacultySuccess: true,
    setIsGetAllFacultySuccess: action((state, payload) => {
        state.isGetAllFacultySuccess = payload;
    }),
    getAllFaculty: thunk(async (actions) => {
        return getAllFaculty()
            .then(async (res) => {
                actions.setIsGetAllFacultySuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllFacultySuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),
})