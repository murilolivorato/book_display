<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >


    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Books</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />

    <!-- Bootstrap core CSS     -->
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />

    <!--  Fonts and icons     -->
    <link href="/assets/css/font-awesome.min.css" rel="stylesheet">

    <!--  Paper Dashboard core CSS    -->
    <link href="/assets/css/paper-dashboard.css" rel="stylesheet"/>

    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="/assets/css/demo.css" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/css/hint.css">

    <link href="/assets/css/themify-icons.css" rel="stylesheet">



</head>
<body>


<div id="<?= $pg ?>">
    <div class="wrapper" >

        <!-- @loading --->
        <div class="loading_bg" v-if="loadingPage == true"><div class="text-center"><div class="mloading-bar">Loading ...</div></div></div>

        <div class="main-panel">

            <div class="content">

                @yield('content')

            </div>


            <footer class="footer">
                <div class="container-fluid">

                    <div class="copyright pull-right">
                        <p>Book Display List</p>
                    </div>
                </div>
            </footer>

        </div>
    </div>
</div>




<script src="/assets/js/app.js" type="text/javascript"></script>
</body>
</html>
