import { api } from "./api";

export const createGroup = (payload) => api.post("/groups", payload);
export const fetchGroups  = () => api.get("/groups");

export const fetchGroupById = (groupId) => api.get(`/groups/${groupId}`);

export const deleteGroup = (groupId) => api.delete(`/groups/${groupId}`);
