import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
    isRequired?: boolean;
    label?: string;
}

function Input({
    className,
    type,
    isRequired = false,
    label,
    ...props
}: InputProps) {
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
            <input
                type={type}
                data-slot="input"
                required={isRequired}
                className={cn(
                    'file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] selection:bg-primary file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    className,
                )}
                {...props}
            />
        </div>
    );
}

export { Input };
