import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
    isRequired?: boolean;
    label?: string;
}

function Textarea({
    className,
    isRequired = false,
    label,
    ...props
}: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-1.5 block text-sm font-medium text-black">
                    {label}
                    {isRequired && (
                        <span
                            className="ml-1 text-red-500"
                            aria-label="required"
                        >
                            *
                        </span>
                    )}
                </label>
            )}
            <textarea
                data-slot="textarea"
                required={isRequired}
                className={cn(
                    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className,
                )}
                {...props}
            />
        </div>
    );
}

export { Textarea };
