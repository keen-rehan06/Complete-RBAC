// export const ROLES = {
//     USER:"USER",
//     DELIVERY_BOY:"DELIVERY_BOY",
//     DRIVER:"DRIVER",
//     SELLER:"SELLER",
//     ADMIN:"ADMIN",
//     SUB_ADMIN:"SUB_ADMIN",
//     SUPER_ADMIN:"SUPER_ADMIN"
// }

export const ROLE_HIERARCHY = {
    SUPER_ADMIN:[
        "ADMIN",
        "SUB_ADMIN",
        "SELLER",
        
        "DRIVER",
        "DELIVERY_BOY",
        "USER"
    ],
    ADMIN:[
        "SUB_ADMIN",
        "SELLER",
        "DRIVER",
        "DELIVERY_BOY",
        "USER"
    ],
    SUB_ADMIN:[
        "SELLER",
        "DRIVER",
        "DELIVERY_BOY",
        "USER"
    ]
}