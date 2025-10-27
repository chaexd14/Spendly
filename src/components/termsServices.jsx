import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';

function TermsServices() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="px-0">
            Terms Services
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[350px] sm:max-w-md rounded-lg">
          <DialogTitle>Sample Terms & Services</DialogTitle>
          <DialogDescription>Sample description</DialogDescription>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TermsServices;
