import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@todo/components/ui/dialog"
import {Button} from "@todo/components/ui/button";
import EditTodoForm from "@todo/components/todo/edit/form";
import {DropdownMenuItem} from "@radix-ui/react-dropdown-menu";

const EditDialog = ({listId, todoId}: EditDialogProps) => {
    return <Dialog>
        <DialogTrigger asChild>
            <DropdownMenuItem>
                Add item
            </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <EditTodoForm listId={listId} todoId={todoId}/>
            </DialogHeader>
        </DialogContent>
    </Dialog>;
};

interface EditDialogProps {
    listId: string;
    todoId: string;
}

export default EditDialog;