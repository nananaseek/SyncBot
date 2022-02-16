import api from "../../api/axios";

const UserService = {
  init: async () => {
    return api.get("/user/");
  },
};

export default UserService;
