
class Turing {

    constructor(state, sigma, _initialState, _finalStates ) {
        this.states= state.split(",");
        this.alphas= sigma.split(",");
        if(this.states.indexOf(_initialState)>-1) {
            this.initialState= _initialState;
        }
        this.finalStates= _finalStates.split(",")
        this.grammar= [];
        this.currentState= _initialState;
        this.HALTED= false;
    }

    setGrammar (currentState, read, nextState, write, move ) {

        if(this.states.indexOf(currentState)<0 || this.states.indexOf(nextState)<0) {
            throw new String("State Not Found...");
        }
        if((this.alphas.indexOf(read)<0 || this.alphas.indexOf(write)<0) 
            && read!="BLANK" && write!= "BLANK") {
            throw new String("Input Alphabet Not Found...");
        }
        if(move !="L" && move !="R" && move !="l" && move !="r") {
            throw new String("only (L)eft and (R)ight moves are valid...");
        }

        if(!this.findNext(currentState, read)) {
            this.grammar.push( {
                currentState: currentState,
                read: read,
                nextState: nextState,
                write: write,
                move: move
            });
            return true;
        } else {
            throw new String("Invalid Grammer...");
        }

    }

    findNext(currentState, read) {
        for(let i=0; i<this.grammar.length; i++) {
            if(this.grammar[i].currentState== currentState && this.grammar[i].read== read) {
                return this.grammar[i];
            }
        }
        return undefined;
    }

    setString(str) {
        for(let i=0; i<str.length; i++) {
            if(this.alphas.indexOf(str.charAt(i))<0) {
                throw new String("Invalid Character in input");
            }
        }
        this.string= str.split("");
        this.headIndex= 0;
        return "done";
    }

    move() {
        if(this.HALTED) {
            return;
        }
        let curRead= "BLANK";
        if(this.headIndex<this.string.length && this.headIndex>-1) {
            curRead= this.string[this.headIndex];
        }
        let next= this.findNext(this.currentState, curRead);

        if(next) {
            this.currentState= next.nextState;
            
            if(next.move=="l" || next.move=="L") {
                if(this.headIndex==0) {
                    for(let i=this.string.length-1; i>=0; i--) {
                        this.string[i+1]= this.string[i];
                    }
                    this.string[1]= next.write;
                    this.string[0]= "BLANK";
                }
                else if(this.headIndex<this.string.length) {
                    this.string[this.headIndex--]= next.write;
                }
            } else {
                this.string[this.headIndex++]= next.write;
                if(this.headIndex>= this.string.length) {
                    this.string[this.headIndex]="BLANK";
                }
            }
            return this.string;

        } else {
            this.HALTED= true;
            return false;
        }

    }




}