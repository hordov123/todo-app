import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@todo/components/ui/dialog"
import CreateTodoForm from "@todo/components/todo/create/form";
import {Button} from "@todo/components/ui/button";

const CreateDialog = ({listId}: CreateDialogProps) => {
    return <Dialog>
        <DialogTrigger asChild>
            <Button>
                Add item
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <CreateTodoForm listId={listId}/>
            </DialogHeader>
        </DialogContent>
    </Dialog>;
};

interface CreateDialogProps {
    listId: string;
}

export default CreateDialog;