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

function PrivacyPolicy() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="px-0">
            Privacy Policy
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[350px] sm:max-w-md rounded-lg">
          <DialogTitle>Sample Privacy & Policy</DialogTitle>
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

export default PrivacyPolicy;
