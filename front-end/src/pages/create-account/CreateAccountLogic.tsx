export function submit(email: string, first: string, last: string, pass: string, user: string) {
    alert("Email: " + email + ", Name: " + first + " " + last + ", Pass: " + pass + ", User Type: " + user);
}

export function checkPassword(pass: string, confirmPass: string): boolean {
    if (pass !== confirmPass) {
        alert("Passwords do not match");
        return false;
    }
    return true;
}

export function isEmpty(s: string): boolean {
    if (s === "") {
        alert("Field cannot be left empty");
        return true;
    }
    return false;
}

export function isTypeDefault(s: string): boolean {
    if (s === "default") {
        alert("Pleas select a user type");
        return true;
    }
    return false;
}

export function checkEmail(email: string): boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true;
    }
    alert("Please enter a valid email address");
    return false;
}
