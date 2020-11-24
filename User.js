class User{
   
    //criando metodo construtor:
    constructor(name, gender, birth, country, email, password, photo, admin){
        //coloque "_nomeDaVariavel" para fazer dela uma prop. privada
        this._name = name
        this._gender = gender
        this._birth = birth
        this._country = country
        this._email = email
        this._password = password
        this._photo = photo
        this._admim = admin
        this._register = new Date()

    }

    get name(){
        return this._name
    }

    get gender(){
        return this._name
    }

    get birth(){
        return this._name
    }

    get country(){
        return this._name
    }

    get email(){
        return this._name
    }

    get password(){
        return this._password
    }

    get photo(){
        return this._photo
    }

    get admin(){
        return this._admin
    }

    set photo(photo){
        this._photo = photo
    }

    get register(){
        return this._register
    }
    
}