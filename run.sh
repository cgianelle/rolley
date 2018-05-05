maincmd=$1
shift
rest="$@"

echo $maincmd "$rest"
echo $maincmd "$rest" | bash
