import http from "../http-common";

const getAll = () => {
    return http.get("/Stocks/");
};

const get = id => {
    return http.get(`/Stocks/${id}/`);
};

const create = data => {
    return http.post("/Stocks/", data);
};

const update = (id, data) => {
    return http.put(`/Stocks/${id}/`, data);
};

const remove = id => {
    return http.delete(`/Stocks/${id}/`);
};

const findByTicker = ticker => {
    return http.get(`/Stocks?ticker=${ticker}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByTicker
};
