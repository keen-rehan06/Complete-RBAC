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
    };

    export const permission = {
        ADMIN:["CREATE_POST", "VIEW_POST", "UPDATE_POST", "DELETE_POST"],
        SELLER:["CREATE_POST", "VIEW_POST", "UPDATE_POST"],
        SUB_ADMIN:["CREATE_POST", "VIEW_POST", "UPDATE_POST"]
    }