export const permission = {
  CREATE_POST: "CREATE_POST",
  EDIT_POST: "EDIT_POST",
  VIEW_POST: "VIEW_POST",
  DELETE_POST: "DELETE_POST",
};

export const ROLES = {
  admin: [
    permission.CREATE_POST,
    permission.DELETE_POST,
    permission.EDIT_POST,
    permission.VIEW_POST,
  ],
  editor: [
    permission.CREATE_POST,
    permission.EDIT_POST,
    permission.VIEW_POST
],
user:[
    permission.VIEW_POST
]
};
