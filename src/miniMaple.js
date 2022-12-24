class MiniMaple{
    
    addPlus(str){
        if(str[0] != '-')
            str = '+'.concat(str);
        return str;
    }

    regexString(str){
        let regex = /^((\-|\+)((\d+\*){0,1}([a-z](\^\d+){0,1})|(\d+)(\*[a-z](\^\d+){0,1}){0,1}))+$/gm;
        return regex.test(str);
    }

    diffFunc(str, x){
        str = str.replace(/\s+/g, '');
        str = this.addPlus(str);
        if(!this.regexString(str)){
            return 'Error';
        }
        if(str.search(x) == -1){
            return '0';
        }
        let terms = str.match(/(\-|\+)([^-+])+/gm);
        let res = '';
        terms.forEach(term => {
            if(term.search(x) == -1){
                return;
            }
            let digits = term.match(/\d+/gm);
            if(digits == undefined){
                res += term[0] + '1';
            }
            else if(digits.length == 2){
                let coeff = Number(digits[0]);
                let pow = Number(digits[1]);
                coeff *= pow;
                pow -= 1;
                if(pow == 1){
                    res += term[0] + coeff.toString() + '*' + x;
                }
                else{
                    res += term[0] + coeff.toString() + '*' + x + '^' + pow.toString();
                }
            }
            else if(term.match(/^[-+]\d+\*[a-z]$/g)){
                res += term[0] + digits[0].toString();
            }
            else{
                let pow = Number(digits[0]);
                let coeff = pow;
                pow -= 1;
                if(pow == 1){
                    res += term[0] + coeff.toString() + '*' + x;
                }
                else {
                    res += term[0] + coeff.toString() + '*' + x + '^' + pow.toString(); 
                }
            }
        });
        if(res[0] == '+'){
            res = res.substring(1);
        }
        return res;
    }
}

export {MiniMaple}