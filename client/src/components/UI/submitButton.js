import {Button} from "@material-ui/core";

function SubmitButton({children, ...props}) {
    return <Button
        margin={'normal'}
        variant="contained"
        color="primary"
        type="submit"
        {...props}
    >
        {children}
    </Button>;
}

export default SubmitButton;
