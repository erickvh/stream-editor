# Stream editor

## Requirements

sed is a Unix utility used to parse and transform text. For this assignment a simple and naive version of sed will be created.
This requirements will be:

- Only the substitution command is required.
- Create a command line utility that accepts options and arguments. The first argument will be the command and the second one will be the file.
- Check if the file specified exists
- Check if the substitution command is valid.
- Implement the -n, -i, -e and -f options.
- Implement the I, p, g and w flags.

For the -f option (script file), a script file would consiste of several lines containing one substitution command each.

## How to install

```
npm install

```

## options

--version: show version number [booleano]
-n consider files as separate rather than as a single, continuous
long stream [booleano]
-i edit files in place [booleano]
-e Add the commands in script to the set of commands to be run while
processing the input. [tabla]
-f Add the commands contained in the file script-file to the set of
commands to be run while processing the input.
[String]
-h, --help Show help

### usage

- basic usage

```
node sed.js s/pattern/replace/ file_path

```

- using flags

```
node sed.js s/pattern/replace/I file_path
node sed.js s/pattern/replace/g file_path
node sed.js s/pattern/replace/p file_path
node sed.js s/pattern/replace/w newfilename file_path

```

- option -f

```
  node sed.js file_path -f script_path
```

- option -e

```
  node sed.js file_path -e s/pattern/replace/ s/pattern/replace/
  node sed.js file_path -e s/pattern/replace/ -e s/pattern/replace/
```

- option -n

```
  node sed.js s/pattern/replace/p file_path -n
  node sed.js s/pattern/replace/ file_path -n
```

- option -i

```
  node sed.js file_path -i -f script_path
  node sed.js s/pattern/replace/ -i
```
