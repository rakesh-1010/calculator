import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Screen from './components/screen';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
    calculator: {
        padding: "50px"
    },
    key: {
        fontSize: '42px'
    }
}));

const ButtonRow = ({key1, key2, key3, key4, handleButtonClick}) => {
    const classes = useStyles();
     return(
        <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
                <ButtonGroup fullWidth={true} color="secondary" size="large" aria-label="large outlined primary button group">
                    <Button
                        onClick={() => handleButtonClick(key1)}
                        className={classes.key}
                    >
                        {key1}
                    </Button>
                    <Button
                        onClick={() => handleButtonClick(key2)}
                        className={classes.key}>
                        {key2}
                    </Button>
                    <Button
                        onClick={() => handleButtonClick(key3)}
                        className={classes.key}
                    >
                        {key3}
                    </Button>
                    <Button
                        onClick={() => handleButtonClick(key4)}
                        variant="contained"
                        color="secondary"
                        className={classes.key}
                    >
                        {key4}
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
     )
}

export default function Calculator() {
    const classes = useStyles();
    const [stateOptions, setStateValues] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    function isLastInputOptr(){
       return (
           ["=", "+", "-", "÷", "X","%"].includes(
               stateOptions[stateOptions.length-1]
           )
       )
    }

    function isCurrentInputOptr(input) {
        return (
            ["=", "+", "-", "÷", "X","%"].includes(
                input
            )
        )
    }

    function deleteLastInput() {
        setStateValues(
            stateOptions.slice(0, -1)
        );
    }

    function evaluate() {
        let output = eval(stateOptions.join(""))
        setStateValues([
            output
        ]);

    }
    const handleButtonClick = (e) => {
        if(e === "AC"){
            setStateValues([]);
        }else if(e === "C"){
            deleteLastInput();
        }else if(stateOptions.length === 0 && ["0", "00"].includes(e)){
            setStateValues([]);
        }else if(stateOptions.length === 0 && (isCurrentInputOptr(e)-['-'])){
            setErrorMsg("* First input can't be an operator");
            setStateValues([]);
        }else if (isLastInputOptr() && isCurrentInputOptr(e)){
            setErrorMsg("* Can't put two operators together");
        }else if(e === "="){
            evaluate();
        }
        else {
            setErrorMsg("");
            setStateValues([
                ...stateOptions,
                e
            ]);
        }
    };
    return (
        <div className={classes.calculator}>
            <Container maxWidth="sm">
                <span style={{color: "red"}} >{errorMsg}</span>
                <Grid container spacing={1} style={{paddingTop: "10px"}}>
                    <Grid item xs={12} sm={8}>
                        <Screen display={stateOptions} />
                    </Grid>
                </Grid>
                <ButtonRow
                    handleButtonClick={handleButtonClick}
                    key1={"AC"}
                    key2={"%"}
                    key3={"/"}
                    key4={"*"}
                />
                <ButtonRow
                    handleButtonClick={handleButtonClick}
                    key1={"C"}
                    key2={"0"}
                    key3={"00"}
                    key4={"."}
                />
                <ButtonRow
                    handleButtonClick={handleButtonClick}
                    key1={7}
                    key2={8}
                    key3={9}
                    key4={"-"}
                />
                <ButtonRow
                    handleButtonClick={handleButtonClick}
                    key1={4}
                    key2={5}
                    key3={6}
                    key4={"+"}
                />
                <ButtonRow
                    handleButtonClick={handleButtonClick}
                    key1={1}
                    key2={2}
                    key3={3}
                    key4={"="}
                />
            </Container>
        </div>
    );
}