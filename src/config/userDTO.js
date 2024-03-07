export class UserReadDTO{
    constructor(user){
        this.first_name=user.first_name.toUpperCase()
        this.last_name=user.last_name?user.last_name.toUpperCase():"no definido"
        this.email=user.email
        this.role=user.role
    }
}