export default [
	{
		action: 'command',
		command: "x : int;",
		transcription: "Optional Haskell-style type annotation"
	},
	{
		action: 'command',
		command: "x = 5;",
		output: "int :: 5",
		transcription: "Variable assignment"
	},
	{
		action: 'command',
		command: "z : [str] = [\"John\", \"Smith\"];",
        output: "[str] :: [\"John\", \"Smith\"]",
		transcription: "Type annotations can be inlined"
	},
	{
		action: 'command',
		command: "f : int -> int = \\x. x + 5;",
        output: "func :: f",
		transcription: "Lambda expressions"
	},
	{
		action: 'command',
		command: 'add2 = \\x. add(2, x);',
        output: "func :: add2",
		transcription: 'Functions are first-class citizens'
	},
    {
        action: 'command',
        command: 'download();',
		output: "link :: <a href=\"https://github.com/MKJM2/Tap\">here</a>",
    }
]
