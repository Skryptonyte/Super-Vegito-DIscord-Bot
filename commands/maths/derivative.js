const mathjs = require('mathjs');

module.exports = {
name: 'derivative',
desc: 'Take derivative of function',
execute(message,args){
	if (args.length < 2){
		message.channel.send("Provide an expression");
		return;
	}
	var expression = args.slice(1).join(' ');
	const tex = mathjs.simplify(mathjs.derivative(mathjs.parse(expression),mathjs.parse('x'))).toTex();
	
	const mathjax = require('mathjax-node');
	const svg2png = require('convert-svg-to-png');	
	mathjax.start()
	
	mathjax.typeset({
		math: tex,
		format: "TeX",
		width: 3840,
		height:2160,
		ex:500,
		svg:true},
		data => {
			if (!data.errors){
			console.log(data);
			const png = svg2png.convert(data.svg,{height:2160,width:3840,background:"white"}).then(pngdata => {
					console.log(pngdata);
					message.channel.send({files:[{attachment:pngdata, name:"math_render.png"}]})
				})
			}
		});
		
}
}
