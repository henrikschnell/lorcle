type Props = {
    count: number;
};

export default function GuessCounter({ count }: Props) {
    return (
        <div className="text-center mb-6">
            <span>
                {count} player{count === 1 ? '' : 's'} guessed the card correctly!
            </span>
        </div>
    );
}
