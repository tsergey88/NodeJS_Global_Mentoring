export const Groups = [
  {
    id: 1,
    name: "Admin",
    permissions: [
        "READ",
        "WRITE",
        "DELETE",
        "SHARE",
        "UPLOAD_FILES"
    ]
  },
  {
    id: 2,
    name: "User",
    permissions: [
        "READ",
        "SHARE"
    ]
  },
  {
    id: 4,
    name: "SuperAdmin",
    permissions: [
        "READ",
        "WRITE",
        "DELETE",
        "SHARE",
        "UPLOAD_FILES"
    ]
  }
];

export const Group = {
  id: 5,
  name: "SA",
  permissions: ["READ","WRITE","DELETE","SHARE","UPLOAD_FILES"]
};

export const existingGroup = {
  id: 4,
  name: "SuperAdmin",
  permissions: [
      "READ",
      "WRITE",
      "DELETE",
      "SHARE",
      "UPLOAD_FILES"
  ]
}