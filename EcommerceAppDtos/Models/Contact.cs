using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppServices.Models;

[Table("CONTACT")]
public partial class Contact
{
    [Key]
    [Column("conid")]
    public int Conid { get; set; }

    [Column("name")]
    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column("email")]
    [StringLength(233)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("phone")]
    [StringLength(100)]
    [Unicode(false)]
    public string Phone { get; set; } = null!;

    [Column("address")]
    [StringLength(255)]
    [Unicode(false)]
    public string Address { get; set; } = null!;

    [Column("message")]
    [Unicode(false)]
    public string Message { get; set; } = null!;

    [Column("stamp", TypeName = "datetime")]
    public DateTime Stamp { get; set; }

    [Required]
    [Column("co_status")]
    public bool? CoStatus { get; set; }
}
