
import { Download, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Download className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">Dropify</span>
          </div>

          <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-sm text-muted-foreground p-1">
              &copy; {currentYear} Dropify. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <a href="mailto:whitesnake1611@gmail.com" className="hover:underline">
                <Mail className="inline h-6 w-6 p-1 mr-1" />
                whitesnake1611@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
