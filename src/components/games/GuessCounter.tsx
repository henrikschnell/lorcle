type Props = {
    count: number;
};

export default function GuessCounter({ count }: Props) {
    return (
        <div className="text-center mb-6">
            <p>
                <span className="text-primary">{count}</span> player{count === 1 ? '' : 's'} guessed the card correctly!
            </p>
        </div>
    );
}
