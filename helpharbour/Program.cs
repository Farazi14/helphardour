using helpharbour.Services; // adding the services
using helpharbour.DAO;  // adding the DAO

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// adding the mongoDB connection
builder.Services.AddSingleton<MongoDBConnection>(conn => new MongoDBConnection(builder.Configuration));

//adding DAOs
builder.Services.AddTransient<TicketDAO>();
builder.Services.AddTransient<UserAccountDAO>();
builder.Services.AddTransient<CommentDAO>();
builder.Services.AddTransient<faqDAO>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
