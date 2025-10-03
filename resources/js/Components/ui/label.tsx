import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
    isRequired?: boolean;
}

function Label({
    className,
    isRequired = false,
    children,
    ...props
}: LabelProps) {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(
                'flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
                className,
            )}
            {...props}
        >
            {children}
            {isRequired && (
                <span className="text-red-500" aria-label="required">
                    *
                </span>
            )}
        </LabelPrimitive.Root>
    );
}

export { Label };
