# A-Pitch library

The a-pitch library are some functions that helps build libraries that uses the a-pitch format.

They are intended to be used inside other libraries.

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="notation"><span class="type-signature"></span>notation<span class="signature">(parser, builder)</span><span class="type-signature"> &rarr; {function}</span></h4>
</dt>
<dd>
<div class="description">
<p>Create an a-pitch notation function</p>
<p>Given a parser (a function that converts from string to a-pitch) and a builder
(a function that convertos from a-pitch to string) create a function that
perform boths conversions (depending on the arguments) and memoize the values</p>
<p>A notation function has the following characteristics:
- convert from string to array and the opposite
- caches the values
- have parse and build function to bypass the cache
- have asArray utility function</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>parser</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>the parser function (from string to a-pitch)</p></td>
</tr>
<tr>
<td class="name"><code>builder</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>the builder function (from a-pitch to string)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/a-pitch/blob/master/notation.js">notation.js</a>
<span>, </span>
<a href="https://github.com/danigb/a-pitch/blob/master/notation.js#L24">lineno 24</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the standard parser</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">function</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>var pitch = notation(parsePitch, buildPitch)
pitch('C#2') // => [0, 1, 2]
pitch([0, 1, 2]) // => 'C#2'</code></pre>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT License
