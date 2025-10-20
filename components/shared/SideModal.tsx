import { useEffect } from 'react';
import { CloseIcon } from './Icons';

type SideModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    position?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
    overlay?: boolean;
};

export default function SideModal({ 
    isOpen, 
    onClose, 
    title, 
    position = 'right', 
    size = 'md',
    children,
    overlay = true 
}: SideModalProps) {
    
    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);



    // Size classes
    const sizeClasses = {
        sm: 'w-80',
        md: 'w-96',
        lg: 'w-[32rem]',
        xl: 'w-[40rem]'
    };

    // Position classes
    const positionClasses = {
        left: {
            container: 'justify-start',
            modal: isOpen ? 'translate-x-0' : '-translate-x-full',
        },
        right: {
            container: 'justify-end',
            modal: isOpen ? 'translate-x-0' : 'translate-x-full',
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay Background */}
            {overlay && (
                <div 
                    className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                        isOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                    onClick={onClose}
                />
            )}
            
            {/* Modal Container */}
            <div 
                className={`fixed inset-0 z-50 flex ${positionClasses[position].container} pointer-events-none`}
            >
                {/* Modal */}
                <div 
                    className={`
                        relative h-full bg-white shadow-2xl 
                        transform transition-transform duration-300 ease-in-out
                        flex flex-col pointer-events-auto
                        ${sizeClasses[size]}
                        ${positionClasses[position].modal}
                    `}
                >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <CloseIcon width={20} height={20} />
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {title ? (
                        <div className="p-4">
                            {children}
                        </div>
                    ) : (
                        <>
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon width={20} height={20} />
                            </button>
                            {children}
                        </>
                    )}
                </div>
                </div>
            </div>
        </>
    );
}