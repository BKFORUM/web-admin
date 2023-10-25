import BaseURL from "@utils/api/baseURL";

const getAllFaculty = () => {
    return BaseURL({
        url: `/faculty`,
        method: "GET",
    });
};

export { getAllFaculty }