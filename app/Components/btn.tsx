'use client';

export default function MyButton({ count, onClick }: { count: number, onClick: () => void}) {
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    )
}
