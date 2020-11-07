import http from "../http-common";

const getAll = () => {
    return http.get("/stocks");
};

const get = id => {
    return http.get(`/stocks/${id}`);
};

const create = data => {
    return http.post("/stocks", data);
};

const update = (id, data) => {
    return http.put(`/stocks/${id}`, data);
};

const remove = id => {
    return http.delete(`/stocks/${id}`);
};

const findByTicker = ticker => {
    return http.get(`/stocks?ticker=${ticker}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByTicker
};
